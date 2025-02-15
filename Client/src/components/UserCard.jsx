import { motion } from "framer-motion";

const UserCard = ({ user, onSwipe }) => {
  return (
    <motion.div
      className="absolute w-[400px] h-[80vh] flex justify-center items-center group"
      initial={{ scale: 1, y: 0 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ x: 200, opacity: 0 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => {
        if (info.offset.x > 100) {
          onSwipe("right", user.id);
        } else if (info.offset.x < -100) {
          onSwipe("left", user.id);
        }
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-700 to-pink-600" />
      <div className="absolute inset-0 bg-gradient rounded-2xl-to-br from-purple-700 to-pink-600 blur-xl" />

      {/* Inner dark container */}
      <div className="absolute rounded-2xl inset-[6px] bg-black/60 z-10" />

      {/* Content container */}
      <div className="absolute z-20 rounded-2xl w-full h-full flex flex-col items-center justify-center p-8">
        {/* Profile image */}
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 mb-8">
          <img src={user?.url} alt="Profile" className="w-full h-full object-cover" />
        </div>

        {/* Name and skills */}
        <div className="text-center">
          <h3 className="text-white font-medium text-3xl mb-4">{user?.name}</h3>
          <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-sm">
            <span className="text-base bg-white/10 text-white/80 px-4 py-2 rounded-full">{user?.bio}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-0 w-full flex justify-center gap-6 mb-6">
          {/* Reject button */}
          <button
            onClick={() => onSwipe("left", user.id)}
            className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Accept button */}
          <button
            onClick={() => onSwipe("right", user.id)}
            className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
