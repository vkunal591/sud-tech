"use client";

const ConfirmModal = ({
  data,
  onClose,
  handleAction,
}: {
  data: any;
  onClose: any;
  handleAction: any;
}) => {
  return (
    <div className="flex flex-col p-10 justify-center items-center gap-5">
      <h4 className="text-4xl w-3/4 text-center font-bold text-primary">
        Do you really want to perform this action ?
      </h4>
      <div className="flex justify-ce-nter mt-5 items-center gap-5">
        <button
          onClick={() => handleAction(data)}
          className="px-6 py-3 text-white text-2xl rounded-xl bg-blue-500 transition"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 text-white text-2xl rounded-xl bg-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
