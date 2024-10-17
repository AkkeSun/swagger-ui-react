import React from 'react';
import 'swagger-ui-react/swagger-ui.css';
import SwaggerUIBundle from "swagger-ui-dist/swagger-ui-bundle"
import SwaggerUIStandalonePreset from "swagger-ui-dist/swagger-ui-standalone-preset"

// -------- 이름을 변경합니다 ---------
function MobileBackend(props) {
  React.useEffect(() => {
    const ui = SwaggerUIBundle({

      // -------- yaml 파일을 변경합니다 ---------
      urls: [
        { url: '/mobile_backend/user.yaml', name: 'user' },
        { url: '/mobile_backend/purchase.yaml', name: 'purchase' },
        { url: '/mobile_backend/invoice.yaml', name: 'invoice' },
        { url: 'mobile_backend/auth.yaml', name: 'auth' },
        { url: '/mobile_backend/notice.yaml', name: 'notice' },
        { url: '/mobile_backend/shop_diary.yaml', name: 'shop_diary' }
      ],

      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      layout: "StandaloneLayout"
    })
    window.ui = ui
  })
  return (
      <div>
        <div id="swagger-ui"></div>
      </div>
  );
}

// -------- 이름을 변경합니다 ---------
export default MobileBackend;