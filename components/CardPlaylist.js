const Card = ({ title, content }) => (
    <div className="mx-4 w-128 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <p>{content}</p>
    </div>
  );
  
  export default Card;