import {afterAll, beforeAll, describe, expect, test, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import {useSession} from "next-auth/react";
import Header from "@/app/components/Layout/Header";

const useSessionMock = vi.fn(useSession);

describe("Header component, when user is not authenticated", () => {
    beforeAll(async () => {
        useSessionMock.mockReturnValue({
            update: vi.fn(),
            data: null,
            status: "unauthenticated"
        });
        vi.mock("next-auth/react", () => ({
            useSession: () => {
                return useSessionMock();
            }
        }));
        
        render(
            <Header/>
        );
    });
    
    afterAll(() => {
        vi.resetAllMocks();
    });
    
    test("should render sign in button", () => {
        expect(screen.getByText("Sign in to save notes across devices")).toBeDefined();
        expect(screen.getByText("Sign in")).toBeDefined();
    })
    
    test("should have my notepad title", () => {
        expect(screen.getByText("My Notepad")).toBeDefined();
    });
    
    test("Title should link to home page", () => {
        const title = screen.getByText("My Notepad");
        expect(title.parentElement?.getAttribute("href")).toBe("/");
    });
    
});

describe("Header component, when user is authenticated", () => {
    beforeAll(async () => {
        useSessionMock.mockReturnValue({
            update: vi.fn(),
            data: {
                user: {
                    name: "John Doe",
                    email: "john@doe.com",
                    image: "https://example.com/image.jpg"
                },
                expires: "2021-10-10T12:00:00.000Z"
            },
            status: "authenticated"
        });
        vi.mock("next-auth/react", () => ({
            useSession: () => {
                return useSessionMock();
            }
        }));
        
        render(
            <Header/>
        );
    });
    
    afterAll(() => {
        vi.resetAllMocks();
    });
    
    test("should render sign in button", () => {
        expect(screen.getByText("Sign out")).toBeDefined();
    })
    
    test("should have my notepad title", () => {
        expect(screen.getByText("John's Notepad")).toBeDefined();
    });
    
    test("should have user image", () => {
        const profileImage = screen.getByAltText("Profile picture");
        expect(profileImage).toBeDefined();
        expect(profileImage.getAttribute("src")).toContain("_next/image?url=https%3A%2F%2Fexample.com%2Fimage.jpg&w=64&q=75");
        expect(profileImage.getAttribute("width")).toBe("30");
        expect(profileImage.getAttribute("height")).toBe("31");
    });
});