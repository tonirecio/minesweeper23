import React from 'react';
import '../style/PauseModal.css';

function PauseModal({ width, height }) {

    const modalStyle = {
        width: `${width * 24-4}px`,
        height: `${height * 24-4}px`
    }

    if (width < 10) {
        modalStyle.width = `220px`
    }

    return (
        <tfoot>
            <tr>
                <td className="pauseModal" style={modalStyle}></td>
            </tr>
        </tfoot>
    )
}

export default PauseModal;