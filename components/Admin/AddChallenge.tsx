import { addChallenge } from "@/lib/actions/challenges.actions";
export default function AddChallenge() {
  return (
    <div className="mx-10" title="Add Challenge">
      <h1>Add Challenge</h1>
      <form className="[&>div]:grid [&>div>*]:text-black" action={addChallenge}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" />
        </div>
        <div>
          <label htmlFor="code">StarterCode</label>
          <textarea id="code" name="code" />
        </div>
        <div>
          <label htmlFor="testCases">Test Cases</label>
          <textarea id="testCases" name="testCases" />
        </div>
        <div>
          <label htmlFor="answers">Answers</label>
          <textarea id="answers" name="answers" />
        </div>
        <div>
          <label htmlFor="points">Points</label>
          <input type="number" id="points" name="points" />
        </div>
        <div>
          <label htmlFor="categoryD">Difficulty</label>
          <select id="categoryD" name="categoryD">
            <option value="easy">Beginner</option>
            <option value="medium">Intermediate</option>
            <option value="hard">Advanced</option>
          </select>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select id="category" name="category">
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
