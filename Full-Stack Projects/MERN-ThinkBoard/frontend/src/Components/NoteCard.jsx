import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import api from '../Lib/axios'
import toast from 'react-hot-toast'
import { formatDate } from '../Lib/utils'

const NoteCard = ({note, setNotes}) => {

  // delete the note
  const handleDelete = async(e, id) => {
    e.preventDefault(); // to get rid of the default behaviour of the browser

    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); // remove the note from the list & to update the UI immediately
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log(error, "Error deleting note");
      toast.error("Error deleting note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4
  border-solid border-[#00ff9d]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">{formatDate(note.createdAt)}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
        <p>{note.content}</p>
      </div>
    </Link>
  );
}

export default NoteCard