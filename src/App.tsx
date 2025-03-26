import { RecoilRoot } from 'recoil';
import VendingMachine from '@/components/VendingMachine';
import Wallet from '@/components/Wallet';

export default function App() {
  return (
    <RecoilRoot>
      <VendingMachine />
      <Wallet />
    </RecoilRoot>
  );
}
