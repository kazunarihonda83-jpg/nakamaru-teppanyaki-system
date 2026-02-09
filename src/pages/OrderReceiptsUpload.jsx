import { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';

export default function OrderReceiptsUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      // CSVまたはExcelファイルのみ受け付ける
      const allowedTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (allowedTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setUploadResult(null);
      } else {
        alert('CSVまたはExcelファイルを選択してください');
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('ファイルを選択してください');
      return;
    }

    setUploading(true);

    try {
      // TODO: APIエンドポイントを実装後に修正
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await api.post('/order-receipts/upload', formData);

      // 仮の処理
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadResult({
        success: true,
        message: 'アップロードが完了しました',
        imported: 10,
        errors: 0
      });
      
      setFile(null);
    } catch (error) {
      console.error('アップロードエラー:', error);
      setUploadResult({
        success: false,
        message: 'アップロードに失敗しました',
        error: error.message
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    // CSVテンプレートをダウンロード
    const csvContent = "受注番号,顧客名,受注日,納品予定日,商品名,数量,単価,金額\n" +
                      "OR-2026-001,サンプル株式会社,2026-02-01,2026-02-05,商品A,10,1000,10000\n";
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', '受注取引テンプレート.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <Upload size={32} />
        受注取引一覧アップロード
      </h1>

      {/* 説明 */}
      <div style={{
        background: '#e3f2fd',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #90caf9'
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <AlertCircle size={20} color="#1976d2" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1565c0' }}>
              CSVファイルまたはExcelファイルをアップロードできます
            </div>
            <div style={{ fontSize: '14px', color: '#1976d2', lineHeight: '1.6' }}>
              • ファイル形式: CSV (.csv) または Excel (.xlsx, .xls)<br />
              • 最大ファイルサイズ: 5MB<br />
              • テンプレートをダウンロードして、データを入力してアップロードしてください
            </div>
          </div>
        </div>
      </div>

      {/* テンプレートダウンロード */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ marginBottom: '15px', fontSize: '16px', fontWeight: '600' }}>
          テンプレートダウンロード
        </h3>
        <button
          onClick={handleDownloadTemplate}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: '#f5f5f5',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          <FileText size={18} />
          CSVテンプレートをダウンロード
        </button>
      </div>

      {/* ファイルアップロード */}
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
          ファイルアップロード
        </h3>

        {/* ドラッグ&ドロップエリア */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragActive ? '#2563ab' : '#e0e0e0'}`,
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
            background: dragActive ? '#f0f7ff' : '#fafafa',
            transition: 'all 0.3s',
            marginBottom: '20px'
          }}
        >
          <Upload 
            size={48} 
            color={dragActive ? '#2563ab' : '#999'} 
            style={{ marginBottom: '15px' }}
          />
          <div style={{ marginBottom: '10px', fontSize: '16px', color: '#333' }}>
            ファイルをドラッグ&ドロップ
          </div>
          <div style={{ marginBottom: '15px', fontSize: '14px', color: '#999' }}>
            または
          </div>
          <label>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
            <span style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: '#2563ab',
              color: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              ファイルを選択
            </span>
          </label>
        </div>

        {/* 選択されたファイル */}
        {file && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px',
            background: '#f5f5f5',
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} color="#2563ab" />
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{file.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {(file.size / 1024).toFixed(2)} KB
                </div>
              </div>
            </div>
            <button
              onClick={() => setFile(null)}
              style={{
                padding: '6px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={20} color="#999" />
            </button>
          </div>
        )}

        {/* アップロードボタン */}
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{
            width: '100%',
            padding: '12px',
            background: (!file || uploading) ? '#e0e0e0' : '#2563ab',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: (!file || uploading) ? 'not-allowed' : 'pointer',
            fontSize: '15px',
            fontWeight: '500'
          }}
        >
          {uploading ? 'アップロード中...' : 'アップロード'}
        </button>

        {/* アップロード結果 */}
        {uploadResult && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            borderRadius: '6px',
            background: uploadResult.success ? '#e8f5e9' : '#ffebee',
            border: `1px solid ${uploadResult.success ? '#66bb6a' : '#ef5350'}`
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '10px'
            }}>
              {uploadResult.success ? (
                <CheckCircle size={20} color="#66bb6a" />
              ) : (
                <AlertCircle size={20} color="#ef5350" />
              )}
              <div style={{ 
                fontWeight: '600', 
                color: uploadResult.success ? '#2e7d32' : '#c62828'
              }}>
                {uploadResult.message}
              </div>
            </div>
            {uploadResult.success && (
              <div style={{ fontSize: '14px', color: '#2e7d32' }}>
                {uploadResult.imported}件のデータをインポートしました
              </div>
            )}
            {uploadResult.error && (
              <div style={{ fontSize: '14px', color: '#c62828' }}>
                エラー: {uploadResult.error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
