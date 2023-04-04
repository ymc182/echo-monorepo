import { useNearContext, NearConnectBtn } from '@echo-monorepo/near-provider';

export function App() {
  const { accountId } = useNearContext();
  return (
    <div className="bg-[#212121] text-white">
      <div className="flex flex-col gap-3 place-content-center place-items-center h-screen ">
        <div>
          Clean
          <span role="img" aria-label="love-emoji">
            ❤️
          </span>
          React x Tailwindcss {accountId}
        </div>
        <NearConnectBtn className="bg-blue-500 px-2 py-1 rounded-md">
          Connect
        </NearConnectBtn>
      </div>
    </div>
  );
}

export default App;
