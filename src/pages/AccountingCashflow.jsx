import { useState, useEffect } from 'react';
import { TrendingUp, Download, Calendar, DollarSign } from 'lucide-react';
import api from '../utils/api';

export default function AccountingCashflow() {
  const [cashflow, setCashflow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    setStartDate(firstDay);
    setEndDate(lastDay);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      loadCashflow();
    }
  }, [startDate, endDate]);

  const loadCashflow = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/accounting-ledgers/cashflow?start_date=${startDate}&end_date=${endDate}`);
      setCashflow(response.data.data || null);
    } catch (err) {
      console.error('Error loading cashflow:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    alert('PDF出力機能は準備中です');
  };

  if (loading) return <div style={{ padding: '20px' }}>読み込み中...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TrendingUp size={24} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>キャッシュフロー計算書</h1>
        </div>
        <button
          onClick={exportToPDF}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          <Download size={20} />
          PDFエクスポート
        </button>
      </div>

      {/* Date Filter */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>
              <Calendar size={16} style={{ display: 'inline', marginRight: '5px' }} />
              開始日
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>
              <Calendar size={16} style={{ display: 'inline', marginRight: '5px' }} />
              終了日
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <button
            onClick={loadCashflow}
            style={{
              padding: '8px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            更新
          </button>
        </div>
      </div>

      {cashflow && (
        <>
          {/* Summary Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>期首残高</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
                ¥{cashflow.summary.opening_balance?.toLocaleString() || 0}
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>純キャッシュフロー</div>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: cashflow.summary.total_net_cashflow >= 0 ? '#10b981' : '#ef4444'
              }}>
                {cashflow.summary.total_net_cashflow >= 0 ? '+' : ''}¥{cashflow.summary.total_net_cashflow?.toLocaleString() || 0}
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>期末残高</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                ¥{cashflow.summary.closing_balance?.toLocaleString() || 0}
              </div>
            </div>
          </div>

          {/* Operating Activities */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
              営業活動によるキャッシュフロー
            </h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>営業収入</span>
                <span style={{ fontWeight: '500', color: '#10b981' }}>
                  +¥{cashflow.operating_activities.cash_in?.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>営業支出</span>
                <span style={{ fontWeight: '500', color: '#ef4444' }}>
                  -¥{cashflow.operating_activities.cash_out?.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>小計</span>
                <span style={{
                  fontWeight: '700',
                  fontSize: '18px',
                  color: cashflow.operating_activities.net >= 0 ? '#10b981' : '#ef4444'
                }}>
                  {cashflow.operating_activities.net >= 0 ? '+' : ''}¥{cashflow.operating_activities.net?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Investing Activities */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
              投資活動によるキャッシュフロー
            </h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>投資収入</span>
                <span style={{ fontWeight: '500', color: '#10b981' }}>
                  +¥{cashflow.investing_activities.cash_in?.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>投資支出</span>
                <span style={{ fontWeight: '500', color: '#ef4444' }}>
                  -¥{cashflow.investing_activities.cash_out?.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>小計</span>
                <span style={{
                  fontWeight: '700',
                  fontSize: '18px',
                  color: cashflow.investing_activities.net >= 0 ? '#10b981' : '#ef4444'
                }}>
                  {cashflow.investing_activities.net >= 0 ? '+' : ''}¥{cashflow.investing_activities.net?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Financing Activities */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
              財務活動によるキャッシュフロー
            </h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>財務収入</span>
                <span style={{ fontWeight: '500', color: '#10b981' }}>
                  +¥{cashflow.financing_activities.cash_in?.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>財務支出</span>
                <span style={{ fontWeight: '500', color: '#ef4444' }}>
                  -¥{cashflow.financing_activities.cash_out?.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>小計</span>
                <span style={{
                  fontWeight: '700',
                  fontSize: '18px',
                  color: cashflow.financing_activities.net >= 0 ? '#10b981' : '#ef4444'
                }}>
                  {cashflow.financing_activities.net >= 0 ? '+' : ''}¥{cashflow.financing_activities.net?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
