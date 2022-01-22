import { state, actions, mutations } from "@/store"

describe("Store", () => {
    describe("Action tests", () => {
        let context
        beforeEach(() => {
            context = {
                commit: jest.fn()
            }
        })

        test("should call addToCount mutation with -1", () => {
            actions.decrement(context)
            expect(context.commit).toHaveBeenCalledWith("addToCount", -1)
        })

        test("should call addToCount mutation with 1", () => {
            actions.increment(context)
            expect(context.commit).toHaveBeenCalledWith("addToCount", 1)
        })
    })
    
    describe("Mutations tests", () => {
        test("should decrement state count by 1", () => {
            mutations.addToCount(state, -1)
            expect(state.count).toBe(-1)
        })

        test("should increment state count by 1", () => {
            mutations.addToCount(state, 1)
            expect(state.count).toBe(0)
        })
    })
})