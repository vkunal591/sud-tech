"use client";

const ConfirmationModal = ({
  id,
  handleDelete,
  handleDeleteModal,
}: {
  id: any;
  handleDelete: any;
  handleDeleteModal: any;
}) => {
  return (
    <div className="flex flex-col py-10 justify-center items-center gap-5">
      <h4 className="text-4xl font-bold text-primary">
        Do you really want to Delete?
      </h4>
      <div className="flex justify-ce-nter mt-5 items-center gap-5">
        <button
          onClick={() => handleDelete(id)}
          className="px-6 py-2 text-white text-2xl rounded-xl bg-secondary transition"
        >
          Delete
        </button>
        <button
          onClick={handleDeleteModal}
          className="px-6 py-2 text-white text-2xl rounded-xl bg-black"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
