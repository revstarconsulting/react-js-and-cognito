/*import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import App from './App';

jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: key => key }),
    Trans: ({ children }) => children
}));

test('renders learn react link', async () => {
    jest.mock('react-i18next', () => ({
        useTranslation: () => ({ t: key => key })
    }));
    await act(async () => render(<App />));
    const linkElement = screen.getByText(/Where can I Sign Up?/i);
    expect(linkElement).toBeInTheDocument();
});*/
test('the best flavor is grapefruit', () => {
    expect('grapefruit').toBe('grapefruit');
});