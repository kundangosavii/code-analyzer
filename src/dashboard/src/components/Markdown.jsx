import ReactMarkdown from 'react-markdown';

function Insights({ content }) {
  return (
    <div style={{ padding: "20px" }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default Insights;