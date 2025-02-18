import { useDropzone } from "react-dropzone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import BackupIcon from "@mui/icons-material/Backup";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home({setQuestions}) {
  const [loading, setLoading] = useState(false);
 const [pdf, setPdf] = useState(null);

const navigate=useNavigate();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { "application/pdf": [] }, 
    multiple: false,
    onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
           
          setPdf(acceptedFiles[0]); 
        
        }
      }
  });
  

const handleSubmit=async ()=>{
    try{
    setLoading(true);
    const res= await axios.post("https://quiz-app-eight-pink.vercel.app/api/upload",pdf,{
        headers:{
            "Content-Type":"application/pdf"
        }
    });
    localStorage.setItem("questions", JSON.stringify(res.data));
    // Update the questions state from res.data
    setQuestions(res.data);
    setLoading(false);
    navigate("/quiz");
}
catch(err){
    console.log(err)
    setLoading(false);
}
}


  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div
        {...getRootProps()}
        className="flex flex-col border-2 border-dashed border-gray-500 rounded-lg p-12 items-center space-y-4 h-96 cursor-pointer"
      >
        <BackupIcon sx={{ fontSize: 150 }} />
        <h1 className="text-2xl">Drag & Drop your PDF</h1>

        {/* Hidden Input */}
        <input {...getInputProps()} className="hidden" />

        <div className="border-2 border-gray-400 h-18 flex items-center justify-center rounded-lg gap-4 p-2">
          <AttachFileIcon />
          <h1 className="text-gray-600 font-bold">Drop files here or click to upload</h1>
        </div>

        {/* Show uploaded file name */}
        {acceptedFiles.length > 0 && (
          <h1 className="text-black font-bold" >{acceptedFiles[0].name} </h1>
        )}
      </div>
      { 
      pdf===null?(<button className="bg-black w-56 text-white px-4 py-2 rounded-lg mt-8 opacity-50 cursor-not-allowed">Start Quiz</button>):
      (
        <>
        {loading?( <h1 className="text-2xl mt-4">Loading...</h1>):
        (
      <button className="bg-black w-56 text-white px-4 py-2 rounded-lg mt-8 cursor-pointer " onClick={handleSubmit}>View Solutions</button>
        )}
      </>
      )
}
    </div>
  );
}
