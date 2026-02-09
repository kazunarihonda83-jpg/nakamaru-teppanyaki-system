import { useState, useEffect } from 'react';
import { FileText, Search, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import api from '../utils/api';

export default function OrderReceipts() {
  const [orderReceipts, setOrderReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadOrderReceipts();
  }, []);

  const loadOrderReceipts = async () => {
    try {
      // TODO: APIエンドポイントを実装後に修正
      // const response = await api.get('/order-receipts');
      // setOrderReceipts(response.data);
      
      // 仮のダミーデータ
      setOrderReceipts([
        {
          id: 1,
          receipt_number: 'OR-2026-001',
          customer_name: '株式会社相模原商事',
          order_date: '2026-02-01',
          delivery_date: '2026-02-05',
          total_amount: 150000,
          status: 'pending',
          items_count: 5
        },
        {
          id: 2,
          receipt_number: 'OR-2026-002',
          customer_name: '田中建設株式会社',
          order_date: '2026-02-03',
          delivery_date: '2026-02-07',
          total_amount: 85000,
          status: 'delivered',
          items_count: 3
        }
      ]);
      
      setLoading(false);
    } catch (error) {
      console.error('受注取引データの読み込みエラー:', error);
      setLoading(false);
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: '受注済',
      processing: '処理中',
      delivered: '納品完了',
      cancelled: 'キャンセル'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffa726',
      processing: '#42a5f5',
      delivered: '#66bb6a',
      cancelled: '#ef5350'
    };
    return colors[status] || '#757575';
  };

  const filteredReceipts = orderReceipts.filter(receipt => {
    const matchesSearch = receipt.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.receipt_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || receipt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>読み込み中...</div>;
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px' 
      }}>
        <h1 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          margin: 0,
          fontSize: '24px',
          color: '#333'
        }}>
          <FileText size={32} />
          受注取引一覧
        </h1>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: '#2563ab',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: '500'
        }}>
          <Plus size={20} />
          新規受注取引
        </button>
      </div>

      {/* 検索とフィルター */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#999'
                }} 
              />
              <input
                type="text"
                placeholder="顧客名または受注番号で検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 40px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">すべてのステータス</option>
            <option value="pending">受注済</option>
            <option value="processing">処理中</option>
            <option value="delivered">納品完了</option>
            <option value="cancelled">キャンセル</option>
          </select>
        </div>
      </div>

      {/* データテーブル */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}>
        {filteredReceipts.length === 0 ? (
          <div style={{ 
            padding: '60px', 
            textAlign: 'center', 
            color: '#999' 
          }}>
            <FileText size={48} style={{ marginBottom: '15px', opacity: 0.3 }} />
            <div>受注取引データがありません</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>受注番号</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>顧客名</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>受注日</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>納品予定日</th>
                <th style={{ padding: '15px', textAlign: 'right', fontWeight: '600', fontSize: '14px' }}>金額</th>
                <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>ステータス</th>
                <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>アクション</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceipts.map((receipt) => (
                <tr 
                  key={receipt.id}
                  style={{ 
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#fafafa'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                >
                  <td style={{ padding: '15px', fontSize: '14px', fontWeight: '500' }}>
                    {receipt.receipt_number}
                  </td>
                  <td style={{ padding: '15px', fontSize: '14px' }}>
                    {receipt.customer_name}
                  </td>
                  <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>
                    {receipt.order_date}
                  </td>
                  <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>
                    {receipt.delivery_date}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'right', fontSize: '14px', fontWeight: '500' }}>
                    ¥{receipt.total_amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <span style={{
                      padding: '5px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: `${getStatusColor(receipt.status)}20`,
                      color: getStatusColor(receipt.status)
                    }}>
                      {getStatusLabel(receipt.status)}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button style={{
                        padding: '6px',
                        background: '#f5f5f5',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Eye size={16} color="#666" />
                      </button>
                      <button style={{
                        padding: '6px',
                        background: '#f5f5f5',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Edit2 size={16} color="#2563ab" />
                      </button>
                      <button style={{
                        padding: '6px',
                        background: '#f5f5f5',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Trash2 size={16} color="#e74c3c" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 統計情報 */}
      <div style={{
        marginTop: '20px',
        padding: '15px 20px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
          全 {filteredReceipts.length} 件の受注取引
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          合計金額: ¥{filteredReceipts.reduce((sum, r) => sum + r.total_amount, 0).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
