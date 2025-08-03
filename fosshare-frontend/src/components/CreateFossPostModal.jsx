import Select from "react-select";
import { useEffect, useState } from "react";

export default function FossPostModal({ showModal, setShowModal }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch(`${apiUrl}/api/tags/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo obtener los tags");
        }
        return res.json();
      })
      .then((data) => {
        const options = data.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }));
        setTags(options);
      })
      .catch((err) => console.error(err));
  }, []);


  const handleTagChange = (selected) => {
    setSelectedTags(selected || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    const postData = {
      title,
      content,
      tags: selectedTags.map((tag) => tag.value), // lista de IDs
    };

    try {
      const response = await fetch(`${apiUrl}/api/posts/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al publicar:", errorData);
        return;
      }

      const result = await response.json();
      console.log("Publicado con éxito", result);
      // Aquí podrías cerrar el modal y limpiar los campos:
      setTitle("");
      setContent("");
      setSelectedTags([]);
      onClose(); // si tienes una función para cerrar el modal
    } catch (error) {
      console.error("Error al enviar el post:", error);
    }
  };


  return (
    showModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-black p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Crear publicación FOSS
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Título del post"
              className="w-full mb-3 p-2 border border-gray-300 rounded"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Contenido"
              className="w-full mb-3 p-2 border border-gray-300 rounded"
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <label className="block text-black font-medium mb-1">Tags</label>
            <Select
              isMulti
              options={tags}
              value={selectedTags}
              onChange={handleTagChange}
              className="mb-4 bg-black text-black"
              placeholder="Buscar y seleccionar tags..."
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded"
              >
                Publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
