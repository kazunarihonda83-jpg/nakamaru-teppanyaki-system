import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('ログイン送信:', { username });
      await login(username, password);
      navigate('/');
    } catch (err) {
      console.error('ログイン失敗:', err);
      const errorMessage = err.response?.data?.error || err.message || 'ログインに失敗しました';
      setError(errorMessage);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '50px 60px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        width: '450px',
        maxWidth: '90%'
      }}>
        {/* Title */}
        <h1 style={{
          textAlign: 'center',
          marginBottom: '10px',
          color: '#2c5aa0',
          fontSize: '32px',
          fontWeight: '700',
          letterSpacing: '2px'
        }}>SYSTEM CLOUD</h1>
        
        <p style={{
          textAlign: 'center',
          marginBottom: '40px',
          color: '#333',
          fontSize: '16px'
        }}>ログインする</p>

        {error && (
          <div style={{
            color: '#e74c3c',
            marginBottom: '20px',
            textAlign: 'center',
            padding: '10px',
            background: '#fdeaea',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '25px' }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                position: 'absolute',
                left: '15px',
                color: '#aaa',
                fontSize: '18px'
              }}>📧</span>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="メールアドレス"
                style={{
                  width: '100%',
                  padding: '15px 15px 15px 45px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2c5aa0'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                position: 'absolute',
                left: '15px',
                color: '#aaa',
                fontSize: '18px'
              }}>🔒</span>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                style={{
                  width: '100%',
                  padding: '15px 15px 15px 45px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2c5aa0'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '15px',
              background: '#2c5aa0',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background 0.3s',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => e.target.style.background = '#234a87'}
            onMouseOut={(e) => e.target.style.background = '#2c5aa0'}
          >
            ログインする
          </button>

          {/* Forgot Password Link */}
          <div style={{ textAlign: 'center' }}>
            <a 
              href="#" 
              style={{
                color: '#3498db',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.color = '#2980b9'}
              onMouseOut={(e) => e.target.style.color = '#3498db'}
            >
              パスワードを忘れた方はこちら
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
