import { useState } from 'react';
import { TokenSelect, type Token } from '@ant-design/web3';
import { ETH, USDT } from '@ant-design/web3-assets/tokens';

const App: React.FC = () => {
  const [token, setToken] = useState<Token>();

  return <TokenSelect value={token} onChange={setToken} tokenList={[ETH, USDT]} />;
};

export default App;
