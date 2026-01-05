const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded max-w-sm">
        <h2 className="font-bold text-lg">Delete comment</h2>
        <p className="text-gray-500 my-3">
          Are you sure? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
