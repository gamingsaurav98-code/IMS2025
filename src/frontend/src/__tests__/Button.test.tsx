import { Button } from "@/components/Button";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button Component", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies primary variant by default", () => {
    const { getByText } = render(<Button>Primary</Button>);
    const button = getByText("Primary");
    expect(button).toHaveClass("bg-blue-600");
  });

  it("applies secondary variant when specified", () => {
    const { getByText } = render(
      <Button variant="secondary">Secondary</Button>
    );
    const button = getByText("Secondary");
    expect(button).toHaveClass("bg-gray-200");
  });
});
