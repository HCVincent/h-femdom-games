import { adminModalState } from "@/atoms/adminModalAtom";
import useGames from "@/hooks/useGames";
import { useRecoilState } from "recoil";
import Add from "./Add";
import Tags from "./Tags";

type AdminModalProps = {
  setSearchInput: (value: string) => void;
  searchInput: string;
};

const AdminModal: React.FC<AdminModalProps> = ({
  setSearchInput,
  searchInput,
}) => {
  const [modalState, setModalState] = useRecoilState(adminModalState);
  const { readGames } = useGames();
  const handleAdd = () => {
    setModalState((prev) => ({
      ...prev,
      view: "add",
    }));
  };
  const handleTags = () => {
    setModalState((prev) => ({
      ...prev,
      view: "tags",
    }));
  };

  const onSubmit = async () => {
    await readGames("games", searchInput);
    setSearchInput("");
  };

  return (
    <div className="hidden lg:flex lg:w-full lg:justify-between">
      <label
        htmlFor="my_modal_admin_add"
        className="btn btn-primary"
        onClick={handleAdd}
      >
        add
      </label>
      <label
        htmlFor="my_modal_admin_add"
        className="btn btn-primary"
        onClick={handleTags}
      >
        tags
      </label>
      <input type="checkbox" id="my_modal_admin_add" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box">
          <div className="flex flex-col w-full justify-start items-start bg-base-100">
            <label className="label">
              {modalState.view === "add" && "add"}
              {modalState.view === "tags" && "tags"}
            </label>

            <div className="flex flex-col w-full">
              {modalState.view === "add" && <Add />}
              {modalState.view === "tags" && <Tags />}
            </div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_admin_add">
          Close
        </label>
      </div>

      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none hover:border-gray-800"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.currentTarget.value)}
            value={searchInput}
            required
          />
          <button
            type="submit"
            className="btn btn-primary text-white absolute right-2 bottom-1  font-medium rounded-lg text-sm"
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
export default AdminModal;
