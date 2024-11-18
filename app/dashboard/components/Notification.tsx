import React from 'react'

function Notification() {
  return (
    <div className="tg-rghtbox">
    <a className="tg-btn" href="/ChooseCategory">
        <i className="icon-bookmark"></i>
        <span>post an ad</span>
    </a>
    <div className="dropdown tg-themedropdown tg-notification">
        <button className="tg-btndropdown" id="tg-notificationdropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="icon-alarm"></i>
            <span className="tg-badge">9</span>
        </button>
        <ul className="dropdown-menu tg-dropdownmenu" aria-labelledby="tg-notificationdropdown">
            <li><p>Consectetur adipisicing sedi eiusmod ampore incididunt ut labore et dolore.</p></li>
            <li><p>Consectetur adipisicing sedi eiusmod ampore incididunt ut labore et dolore.</p></li>
            <li><p>Consectetur adipisicing sedi eiusmod ampore incididunt ut labore et dolore.</p></li>
            <li><p>Consectetur adipisicing sedi eiusmod ampore incididunt ut labore et dolore.</p></li>
            <li><p>Consectetur adipisicing sedi eiusmod ampore incididunt ut labore et dolore.</p></li>
            <li><p>Consectetur adipisicing sedi eiusmod ampore incididunt ut labore et dolore.</p></li>
        </ul>
    </div>
</div>
  )
}

export default Notification;
