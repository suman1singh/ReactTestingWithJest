import { render, screen } from '@testing-library/react';
import App from './App';

test('header renders with react testing tutorial in the document', () => {
  render(<App />);
  const linkElement = screen.getByText(/This is/i);
  expect(linkElement).toBeInTheDocument();
});
test("render login component in the document", ()=>{
  const component = render(<App />);
  // console.log(component);
  const childElement = component.getByLabelText("Email");
  // expect(childElement).toBeInTheDocument();
  expect(childElement).toBeTruthy();
});
