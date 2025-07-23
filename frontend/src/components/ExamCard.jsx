import '../styles/ExamPage.css';

const ExamCard = ({ title, onClick }) => {
  return (
    <div className="exam-card" onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
};

export default ExamCard;