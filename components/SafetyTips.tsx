import React from 'react'
import "@/styles/style.css";
import "@/styles/globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function SafetyTips() {
  return (
    
    <aside className="posts p-4 border actions">
        <aside className="bg-effe">
        <h3 className="aside-title margin-b-3"> Safety Tips</h3>
        <span className="pos-icon">
          <span className="fa fa-laptop"></span>
        </span>
      </aside>
        <ol className='sefetyList'>
            <li>1. Meet in <b>public space</b> to see the item and exchange money </li>
            <li>2. <b>Never send your item</b> before receiving the money </li>
            <li>3. <b>Never send or wire money</b> to sellers or buyers </li>
        </ol>
      </aside>
  )
}

export default SafetyTips