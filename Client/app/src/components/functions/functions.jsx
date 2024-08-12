export default function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

export const EmailHighlighted = (SubmitResponse) => {
  const email = SubmitResponse.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}/);
  const [beforeEmail, afterEmail] = SubmitResponse.split(email);

  return (
    <span style={{width:"95%"}}>
      {beforeEmail}
      <span style={{ color: "white" }}>{email}</span>
      {afterEmail}
    </span>
  );
};