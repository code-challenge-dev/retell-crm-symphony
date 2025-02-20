
export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="animate-fade-in">
        <div className="relative group hover-scale">
          <svg 
            viewBox="0 0 100 100" 
            className="w-64 h-64 md:w-96 md:h-96"
          >
            <path
              d="M50 10 C60 10 80 20 85 35 C90 50 85 65 75 75 C65 85 55 85 50 85 C45 85 35 85 25 75 C15 65 10 50 15 35 C20 20 40 10 50 10 Z"
              fill="#FFE5F9"
              stroke="#FF69B4"
              strokeWidth="2"
            />
            <path
              d="M85 35 C85 35 90 25 95 30"
              fill="none"
              stroke="#FF69B4"
              strokeWidth="2"
            />
            <circle cx="35" cy="40" r="3" fill="#FF69B4" />
            <path
              d="M40 50 C45 55 55 55 60 50"
              fill="none"
              stroke="#FF69B4"
              strokeWidth="2"
            />
            <path
              d="M50 20 L60 10"
              stroke="#FFB6C1"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-16 bg-gradient-to-t from-purple-400 to-pink-300 rotate-12 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
