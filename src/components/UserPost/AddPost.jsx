import React,{useState , useEffect} from 'react'
import Layout from '../UserMainLayout/Layout'
import { createPost, getTags } from '../../ApiServices/postApiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
       const [tags, setTags] = useState([]);
        const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    tagIds: [],
    courseType: '',
    images: []
  });
  const navigate = useNavigate();
      const handleGetTagList = async () => {
            try {
                const response = await getTags();
                if (response?.statusCode === 200) {
                    setTags(response.data);
                } else {
                    toast.error(response?.message || "Failed to fetch tags");
                }
            } catch (error) {
                toast.error(error?.message || "Failed to fetch tags");
            }
        };
    
        useEffect(() => {
            handleGetTagList();
        }, []);

          const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };


  const handleFileChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      images: Array.from(e.target.files)
    }));
  };

   const handleCheckboxChange = (e) => {
    const tagId = e.target.value;
    const isChecked = e.target.checked;
    setFormValues((prev) => {
      const updatedTags = isChecked
        ? [...prev.tagIds, tagId]
        : prev.tagIds.filter((id) => id !== tagId);
      return { ...prev, tagIds: updatedTags };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const postData = {
    title: formValues.title,
    description: formValues.description,
    tagIds: formValues.tagIds,
    courseType: formValues.courseType,
  };
  formData.append("data", JSON.stringify(postData)); 
  formValues.images.forEach((img) => formData.append("images", img));

    try {
      const response = await createPost(formData);
      toast.success(response.message || "Post created successfully");
     navigate('/userDashboard');
      setFormValues({
        title: '',
        description: '',
        tagIds: [],
        courseType: '',
        images: []
      });
    } catch (error) {
      toast.error(error?.message || "Failed to create post");
    }
  };


  return (
    <div>
      <Layout>
     <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Create New Post</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={formValues.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            value={formValues.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

           <label className="block text-sm font-medium text-gray-700 mb-2">Select Tags:</label>
            <div className="grid grid-cols-4 gap-2">
                {tags.map((tag) => (
                <label key={tag.id} className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    value={tag.name}
                    checked={formValues.tagIds.includes(tag.name)}
                  onChange={handleCheckboxChange}
                    />
                    <span>{tag.name}</span>
                </label>
                ))}
            </div>

          <input
            type="text"
            name="courseType"
            placeholder="Course Type (e.g., DAC)"
            value={formValues.courseType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Submit Post
          </button>
        </form>
      </div>
      </Layout>
    </div>
  )
}

export default AddPost
