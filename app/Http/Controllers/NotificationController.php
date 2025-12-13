<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNotificationRequest;
use App\Http\Requests\UpdateNotificationRequest;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Notification::class, 'notification');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Notification::with('user');

        // Filter by user if not admin
        if (!Auth::user()->is_admin ?? false) {
            $query->where('user_id', Auth::id());
        }

        // Filter by type
        if ($request->filled('type')) {
            $query->byType($request->type);
        }

        // Filter by read status
        if ($request->filled('is_read')) {
            if ($request->is_read === 'true') {
                $query->read();
            } else {
                $query->unread();
            }
        }

        // Sort
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'oldest':
                $query->oldest();
                break;
            case 'type':
                $query->orderBy('type', 'asc');
                break;
            default:
                $query->latest();
        }

        $notifications = $query->paginate(20)->withQueryString();

        return Inertia::render('notifications/index', [
            'notifications' => $notifications,
            'filters' => $request->only(['type', 'is_read', 'sort']),
            'stats' => [
                'total' => Auth::user()->notifications()->count(),
                'unread' => Auth::user()->notifications()->unread()->count(),
                'read' => Auth::user()->notifications()->read()->count(),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::select('id', 'name', 'email')->get();

        return Inertia::render('notifications/create', [
            'users' => $users,
            'types' => [
                Notification::TYPE_BOOKING_CONFIRMATION,
                Notification::TYPE_BOOKING_REMINDER,
                Notification::TYPE_BOOKING_CANCELLATION,
                Notification::TYPE_PAYMENT_CONFIRMATION,
                Notification::TYPE_SYSTEM_UPDATE,
                Notification::TYPE_PROMOTIONAL,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNotificationRequest $request)
    {
        $notification = Notification::create($request->validated());

        return redirect()->route('notifications.index')
            ->with('success', 'Notification created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        // Mark as read when viewed
        if (!$notification->is_read && $notification->user_id === Auth::id()) {
            $notification->markAsRead();
        }

        return Inertia::render('notifications/show', [
            'notification' => $notification->load('user')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notification $notification)
    {
        $users = User::select('id', 'name', 'email')->get();

        return Inertia::render('notifications/edit', [
            'notification' => $notification,
            'users' => $users,
            'types' => [
                Notification::TYPE_BOOKING_CONFIRMATION,
                Notification::TYPE_BOOKING_REMINDER,
                Notification::TYPE_BOOKING_CANCELLATION,
                Notification::TYPE_PAYMENT_CONFIRMATION,
                Notification::TYPE_SYSTEM_UPDATE,
                Notification::TYPE_PROMOTIONAL,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNotificationRequest $request, Notification $notification)
    {
        $notification->update($request->validated());

        return redirect()->route('notifications.show', $notification)
            ->with('success', 'Notification updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        $notification->delete();

        return redirect()->route('notifications.index')
            ->with('success', 'Notification deleted successfully.');
    }

    /**
     * Mark notification as read.
     */
    public function markAsRead(Notification $notification)
    {
        $this->authorize('update', $notification);

        $notification->markAsRead();

        return response()->json(['success' => true]);
    }

    /**
     * Mark notification as unread.
     */
    public function markAsUnread(Notification $notification)
    {
        $this->authorize('update', $notification);

        $notification->markAsUnread();

        return response()->json(['success' => true]);
    }

    /**
     * Mark all notifications as read for the authenticated user.
     */
    public function markAllAsRead()
    {
        Auth::user()->notifications()->unread()->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }

    /**
     * Get unread notifications count.
     */
    public function unreadCount()
    {
        $count = Auth::user()->notifications()->unread()->count();

        return response()->json(['count' => $count]);
    }

    /**
     * Get recent notifications for the authenticated user.
     */
    public function recent()
    {
        $notifications = Auth::user()->notifications()
            ->latest()
            ->limit(10)
            ->get();

        return response()->json($notifications);
    }

    /**
     * Bulk delete notifications.
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:notifications,id'
        ]);

        $notifications = Notification::whereIn('id', $request->ids);

        // Ensure user can only delete their own notifications unless admin
        if (!Auth::user()->is_admin ?? false) {
            $notifications->where('user_id', Auth::id());
        }

        $count = $notifications->count();
        $notifications->delete();

        return back()->with('success', "{$count} notifications deleted successfully.");
    }

    /**
     * Bulk mark as read.
     */
    public function bulkMarkAsRead(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:notifications,id'
        ]);

        $notifications = Notification::whereIn('id', $request->ids);

        // Ensure user can only update their own notifications unless admin
        if (!Auth::user()->is_admin ?? false) {
            $notifications->where('user_id', Auth::id());
        }

        $count = $notifications->update(['is_read' => true]);

        return back()->with('success', "{$count} notifications marked as read.");
    }

    /**
     * Send notification to all users (admin only).
     */
    public function broadcast(Request $request)
    {
        $this->authorize('create', Notification::class);

        $request->validate([
            'type' => 'required|string',
            'message' => 'required|string|max:1000',
        ]);

        $users = User::all();
        $notifications = [];

        foreach ($users as $user) {
            $notifications[] = [
                'user_id' => $user->id,
                'type' => $request->type,
                'message' => $request->message,
                'is_read' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Notification::insert($notifications);

        return back()->with('success', 'Notification sent to all users successfully.');
    }
}
