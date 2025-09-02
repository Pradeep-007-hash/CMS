import React, { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "" });
  const [editEvent, setEditEvent] = useState(null);

  // Fetch all events
  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  // Add Event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent)
    });
    const data = await res.json();
    setEvents([...events, data]); // add new event to state
    setNewEvent({ title: "", description: "", date: "" });
  };

  // Update Event
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/events/${editEvent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editEvent)
    });
    const data = await res.json();

    setEvents(events.map(ev => ev.id === editEvent.id ? editEvent : ev)); 
    setEditEvent(null); // reset edit mode
  };

  // Delete Event
  const handleDeleteEvent = async (id) => {
    await fetch(`http://localhost:5000/events/${id}`, {
      method: "DELETE"
    });
    setEvents(events.filter(ev => ev.id !== id));
  };

  return (
    <div className="container">
      <h2>Event Management</h2>

      {/* Add New Event */}
      <form onSubmit={handleAddEvent}>
        <input
          type="text"
          placeholder="Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          required
        />
        <input style={{color:"black"}}
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      {/* Events List */}
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            {editEvent?.id === ev.id ? (
              <form onSubmit={handleUpdateEvent}>
                <input
                  type="text"
                  value={editEvent.title}
                  onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
                />
                <input
                  type="text"
                  value={editEvent.description}
                  onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
                />
                <input
                  type="date"
                  value={editEvent.date}
                  onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
                />
                <button type="submit">Save</button>
                <button onClick={() => setEditEvent(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <span>{ev.title} - {ev.description} ({ev.date})</span>
                <button onClick={() => setEditEvent(ev)}>Edit</button>
                <button onClick={() => handleDeleteEvent(ev.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
