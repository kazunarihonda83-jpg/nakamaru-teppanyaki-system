import { Settings, FileText } from 'lucide-react';

export default function Profile() {
  return (
    <div>
      <h1 style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        marginBottom: '30px',
        fontSize: '24px',
        color: '#333'
      }}>
        <Settings size={32} />
        プロフィール
      </h1>

      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}>
        <FileText size={64} color="#e0e0e0" style={{ marginBottom: '20px' }} />
        <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
          プロフィール
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          この機能は現在開発中です
        </div>
      </div>
    </div>
  );
}
