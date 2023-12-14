const Card = ({ title, content }) => (
    <div className="w-64 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <p>{content}</p>
    </div>
  );
  
  export default Card;