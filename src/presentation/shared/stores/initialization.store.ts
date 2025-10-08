import { observable, computed } from '@legendapp/state'

/**
 * Initialization Step Interface
 * Tracks completion status and message for each initialization step
 */
interface InitializationStep {
  completed: boolean
  message: string
}

/**
 * Initialization State Interface
 * Manages overall app initialization state
 */
interface InitializationState {
  isReady: boolean
  steps: {
    container: InitializationStep
    providers: InitializationStep
    stremio: InitializationStep
  }
  currentStep: number
  totalSteps: number
}

/**
 * Observable state for app initialization
 * Tracks progress through DI container, providers, and Stremio initialization
 */
export const initialization$ = observable<InitializationState>({
  isReady: false,
  steps: {
    container: { completed: false, message: '' },
    providers: { completed: false, message: '' },
    stremio: { completed: false, message: '' },
  },
  currentStep: 0,
  totalSteps: 3,
})

/**
 * Computed value indicating if the app is fully ready
 * Returns true only when all initialization steps are completed
 */
export const isAppReady$ = computed(() => {
  const state = initialization$.get()
  return (
    state.steps.container.completed &&
    state.steps.providers.completed &&
    state.steps.stremio.completed
  )
})

/**
 * Update current step counter based on completed steps
 */
const updateCurrentStep = (): void => {
  const completedCount = Object.values(initialization$.steps.get()).filter(
    (s) => s.completed
  ).length
  initialization$.currentStep.set(completedCount)
}

/**
 * Check if all steps are complete and update ready state
 */
const checkIfReady = (): void => {
  if (isAppReady$.get()) {
    initialization$.isReady.set(true)
  }
}

/**
 * Mark an initialization step as complete with a message
 * @param step - The step to mark as complete
 * @param message - Status message for the step
 */
export const markStepComplete = (
  step: 'container' | 'providers' | 'stremio',
  message: string
): void => {
  initialization$.steps[step].set({ completed: true, message })
  updateCurrentStep()
  checkIfReady()
}

/**
 * Reset initialization state to initial values
 * Useful for app restarts or error recovery
 */
export const resetInitialization = (): void => {
  initialization$.set({
    isReady: false,
    steps: {
      container: { completed: false, message: '' },
      providers: { completed: false, message: '' },
      stremio: { completed: false, message: '' },
    },
    currentStep: 0,
    totalSteps: 3,
  })
}
