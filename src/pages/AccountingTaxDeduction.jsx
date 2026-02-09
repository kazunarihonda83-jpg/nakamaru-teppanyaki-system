import { useState, useEffect } from 'react';
import { Calculator, Download, Search, Plus, Calendar } from 'lucide-react';
import api from '../utils/api';

export default function AccountingTaxDeduction() {
  const [deductions, setDeductions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Set default date range (current month)
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    setStartDate(firstDay);
    setEndDate(lastDay);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      loadDeductions();
    }
  }, [startDate, endDate]);

  const loadDeductions = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/accounting-ledgers/tax-deductions?start_date=${startDate}&end_date=${endDate}`);
      setDeductions(response.data.data || []);
      setSummary(response.data.summary || {});
    } catch (err) {
      console.error('Error loading tax deductions:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDeductions = deductions.filter(d =>
    d.supplier_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToPDF = () => {
    alert('PDF出力機能は準備中です');
  };

  if (loading) return <div style={{ padding: '20px' }}>読み込み中...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calculator size={24} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>税額控除帳</h1>
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

      {/* Filters */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '15px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>
              <Calendar size={16} style={{ display: 'inline', marginRight: '5px' }} />
              開始日
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>
              <Calendar size={16} style={{ display: 'inline', marginRight: '5px' }} />
              終了日
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '10px', top: '10px', color: '#999' }} />
            <input
              type="text"
              placeholder="仕入先名、請求書番号で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 8px 8px 40px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
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
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>課税対象額</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
              ¥{summary.total_taxable_amount?.toLocaleString() || 0}
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>控除税額</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
              ¥{summary.total_tax_amount?.toLocaleString() || 0}
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>合計金額</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
              ¥{summary.total_amount?.toLocaleString() || 0}
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>取引件数</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b7280' }}>
              {summary.count || 0}件
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>取引日</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>仕入先</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>請求書番号</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>税率</th>
              <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600' }}>課税対象額</th>
              <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600' }}>税額</th>
              <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600' }}>合計</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>カテゴリ</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeductions.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                  税額控除データがありません
                </td>
              </tr>
            ) : (
              filteredDeductions.map((deduction) => (
                <tr key={deduction.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>{deduction.transaction_date}</td>
                  <td style={{ padding: '12px' }}>{deduction.supplier_name}</td>
                  <td style={{ padding: '12px' }}>{deduction.invoice_number || '-'}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{deduction.tax_rate}%</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    ¥{deduction.taxable_amount?.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    ¥{deduction.tax_amount?.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    ¥{deduction.total_amount?.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px' }}>{deduction.category || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
