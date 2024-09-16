interface HeaderProps {
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setHasStarted }: HeaderProps) {
  return (
    <div className="flex px-10 items-center justify-around bg-gray-100 w-full h-32 border-b-2 drop-shadow-sm">
      <h1
        className="text-6xl font-semibold drop-shadow-sm cursor-pointer"
        onClick={() =>setHasStarted(false)}
      >
        <span className="text-myorange">Tic</span>
        <span className="text-myblue">Tac</span>
        <span className="text-mygreen">Toe</span>
      </h1>
      <a href="https://www.rosato.dev" target="_blank">
        <button className="transition-all duration-500 bg-gradient-to-r from-mygreen via-myorange to-myblue bg-size-200 bg-pos-0 hover:bg-pos-100 text-white text- text-lg font-bold py-3 px-5 rounded-full">
          Made by Shirou
        </button>
      </a>
    </div>
  );
}
