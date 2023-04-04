import { useNearContext } from '@echo-monorepo/near-provider';

export function App() {
  const { accountId } = useNearContext();
  return (
    <div className="bg-gray-900 text-white">
      <div>Header</div>
      <div className="flex place-content-center place-items-center h-screen ">
        Clean
        <span role="img" aria-label="love-emoji">
          ❤️
        </span>
        React x Tailwindcss {accountId}
      </div>
    </div>
  );
}

export default App;
