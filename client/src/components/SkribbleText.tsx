const SkribbleText = ({textSize} : {textSize: number}) => {
     console.log(`text-${textSize}xl md:text-${textSize+1}xl`);
     
  return (
    <h1 className={`text-${textSize}xl md:text-${textSize+1}xl font-extrabold tracking-tight drop-shadow-2xl flex items-center justify-center gap-1 font-mono`}>
        <span className="text-red-500 hover:scale-110 transition-transform inline-block">s</span>
        <span className="text-yellow-500 hover:scale-110 transition-transform inline-block">k</span>
        <span className="text-orange-500 hover:scale-110 transition-transform inline-block">r</span>
        <span className="text-green-500 hover:scale-110 transition-transform inline-block">i</span>
        <span className="text-blue-400 hover:scale-110 transition-transform inline-block">b</span>
        <span className="text-indigo-400 hover:scale-110 transition-transform inline-block">b</span>
        <span className="text-purple-500 hover:scale-110 transition-transform inline-block">l</span>
        <span className="text-pink-500 hover:scale-110 transition-transform inline-block">.</span>
        <span className="text-teal-400 hover:scale-110 transition-transform inline-block">i</span>
        <span className="text-rose-500 hover:scale-110 transition-transform inline-block">o</span>
    </h1>
  )
}

export default SkribbleText