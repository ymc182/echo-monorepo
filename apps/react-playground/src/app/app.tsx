import { BoomChart } from '@echo-monorepo/boom-chart';
import { useNearContext, NearConnectBtn } from '@echo-monorepo/near-provider';
import { useEffect, useState } from 'react';

export function App() {
  const { accountId } = useNearContext();
  const [data, setData] = useState([
    {
      high: 2,
      low: 1,
      open: 1.5,
      close: 1.3,
      volume: 10,
      time: 1,
    },
    {
      high: 3,
      low: 1,
      open: 1.4,
      close: 1.7,
      volume: 10,
      time: 1,
    },
    {
      high: 4,
      low: 1,
      open: 1.9,
      close: 1.8,
      volume: 10,
      time: 1,
    },
  ]);
  useEffect(() => {
    const _data = [...data];
    const mountInterval = setInterval(() => {
      console.log('update');
      _data.push({
        high: Math.random() * 5,
        low: Math.random() * 5,
        open: Math.random() * 5,
        close: Math.random() * 5,
        volume: Math.random() * 5,
        time: data.length + 1,
      });
      setData([..._data]);
    }, 1500);
    return () => {
      clearInterval(mountInterval);
    };
  }, []);
  return (
    <div className="bg-[#212121] text-white">
      <div className="flex flex-col gap-3 place-content-center place-items-center h-screen ">
        <BoomChart data={data} />
        <div>
          YMC
          <span role="img" aria-label="love-emoji">
            🚀
          </span>
          React x Playground {accountId}
        </div>
        <NearConnectBtn className="bg-blue-500 px-2 py-1 rounded-md">
          Connect
        </NearConnectBtn>
      </div>
    </div>
  );
}

export default App;
