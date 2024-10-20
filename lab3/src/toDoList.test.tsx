import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";

describe("Read all items", () => {
  test("Read the list", () => {
    render(<ToDoList />);

    const item1 = screen.getByText("Apples");
    const item2 = screen.getByText("Bananas");
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();

    const listItems = screen.getAllByRole("checkbox");
    expect(listItems.length).toBe(2);
  });
});

describe("Update items bought", () => {
  test("Check items from bottom up then uncheck top down", () => {
    render(<ToDoList />);
    const checkBoxes = screen.getAllByRole("checkbox"); //get the checkbox elements
    const itemsChecked = screen.getByText(/Items bought:/); // should be 0 since no checked items
    expect(itemsChecked).toHaveTextContent("0");

    fireEvent.click(checkBoxes[1]); // simulate checking the bottom item
    expect(itemsChecked).toHaveTextContent("1"); // verify the update in the title is one item

    fireEvent.click(checkBoxes[0]); // simulate checking the top item as well
    expect(itemsChecked).toHaveTextContent("2"); // verify the update in the title is two items

    fireEvent.click(checkBoxes[0]); //uncheck the top item
    expect(itemsChecked).toHaveTextContent("1"); //verify the update is now one item

    fireEvent.click(checkBoxes[1]); //uncheck the top item
    expect(itemsChecked).toHaveTextContent("0"); //verify the update is now one item
  });

  test("Checking and unchecking one item", () => {
    render(<ToDoList />);
    const checkBoxes = screen.getAllByRole("checkbox");
    const itemsChecked = screen.getByText(/Items bought:/);
    expect(itemsChecked).toHaveTextContent("0");

    fireEvent.click(checkBoxes[0]); //checks first item
    expect(itemsChecked).toHaveTextContent("1");

    fireEvent.click(checkBoxes[0]); // unchecks the first item
    expect(itemsChecked).toHaveTextContent("0");

    fireEvent.click(checkBoxes[1]); //checks second item
    expect(itemsChecked).toHaveTextContent("1");

    fireEvent.click(checkBoxes[1]); // unchecks the second item
    expect(itemsChecked).toHaveTextContent("0");
  });

  test("Checking from top down then uncheck bottom up", () => {
    render(<ToDoList />);
    const checkBoxes = screen.getAllByRole("checkbox");
    const itemsChecked = screen.getByText(/Items bought:/);

    fireEvent.click(checkBoxes[0]); //checks both
    fireEvent.click(checkBoxes[1]);
    expect(itemsChecked).toHaveTextContent("2");

    fireEvent.click(checkBoxes[1]); //unchecks both
    fireEvent.click(checkBoxes[0]);
    expect(itemsChecked).toHaveTextContent("0");
  });
});

describe("Checking and unchecking an item multiple times", () => {
  test("Checking and unchecking first item multiple times", () => {
    render(<ToDoList />);
    const firstCheckbox = screen.getAllByRole("checkbox")[0];

    fireEvent.click(firstCheckbox); //checked
    expect(firstCheckbox).toBeChecked(); //expect(firstCheckbox.checked).toBe(false); somehow has warning

    fireEvent.click(firstCheckbox); //unchecked
    expect(firstCheckbox).not.toBeChecked();

    fireEvent.click(firstCheckbox); //checked
    expect(firstCheckbox).toBeChecked();

    fireEvent.click(firstCheckbox); //unchecked
    expect(firstCheckbox).not.toBeChecked();
  });

  test("Checking and unchecking second item multiple times", () => {
    render(<ToDoList />);
    const secondCheckbox = screen.getAllByRole("checkbox")[1];

    fireEvent.click(secondCheckbox); //checked
    expect(secondCheckbox).toBeChecked();

    fireEvent.click(secondCheckbox); //unchecked
    expect(secondCheckbox).not.toBeChecked();

    fireEvent.click(secondCheckbox); //checked
    expect(secondCheckbox).toBeChecked();

    fireEvent.click(secondCheckbox); //unchecked
    expect(secondCheckbox).not.toBeChecked();
  });
});
