import React from "react";


const CommunityPortal = () => {
  return (
    <div>
      {/* Top section with changing color */}
      <div className="top-section">
        <div className="description">
          <h1>Welcome to the Community Portal System</h1>
          <p>
            Our Community Portal is a one-stop platform designed to connect
            administrators and members in one seamless space. Here, admins can
            share important announcements, post updates, and manage member
            details, while community members can stay informed, share ideas,
            and interact with others. Whether you’re here to manage the
            community or simply stay connected, this portal ensures easy
            communication, organized information sharing, and a friendly
            environment for everyone.
          </p>
          <a className="join-link" href="/signup">
            Feel Free to Join
          </a>
          <a className="join-link" href="/login" style={{ marginLeft: "70px" }}>
            Login
            </a>
        </div>
      </div>

      {/* Moving Images Section */}
      <div className="moving-images">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCd-2u5pG4fseWQ6nCecQfE9oPc5NbY5wPQ&s"
          alt="Image 1"
        />
        <img src="image2.jpg" alt="Image 2" />
        <img src="image3.jpg" alt="Image 3" />
        <img src="image4.jpg" alt="Image 4" />
      </div>
    </div>
  );
};

export default CommunityPortal;
