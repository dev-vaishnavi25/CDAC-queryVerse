const MobileMenu = () => (
  <div className="md:hidden fixed inset-0 z-40 bg-white pt-20">
    <div className="px-4 py-6 space-y-4">
      {['Features', 'Courses', 'CrediRank', 'Contact'].map(link => (
        <a key={link} href={`#${link.toLowerCase()}`} className="block text-gray-700 hover:text-purple-600 py-2">{link}</a>
      ))}
      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-full">
        Join Now
      </button>
    </div>
  </div>
);

export default MobileMenu;
