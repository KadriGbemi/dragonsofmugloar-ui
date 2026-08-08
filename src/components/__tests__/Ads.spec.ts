import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { ref } from 'vue'

import AdsComponent from '@/components/Ads.vue'
import { useAds, useSolveAd } from '@/composables/useAds'

vi.mock('@/composables/useAds', () => ({
  useAds: vi.fn(),
  useSolveAd: vi.fn(),
}))

const mockedUseAds = vi.mocked(useAds)
const mockedUseSolveAd = vi.mocked(useSolveAd)

type TestAd = {
  adId: string
  message: string
  reward: number
  expiresIn: number
  encrypted: string | null
  probability: string
}

describe('AdsComponent', () => {
  const ads: TestAd[] = [
    {
      adId: 'ad-123',
      message: 'Help the village find the lost dragon',
      reward: 250,
      expiresIn: 3,
      encrypted: null,
      probability: '80%',
    },
    {
      adId: 'ad-456',
      message: 'Deliver supplies to the northern village',
      reward: 150,
      expiresIn: 1,
      encrypted: null,
      probability: '60%',
    },
  ]

  const solveAd = vi.fn()
  const clearError = vi.fn()
  const fetchAds = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockedUseAds.mockReturnValue({
      ads: ref(ads),
      loading: ref(false),
      error: ref(null),
      fetchAds,
    })

    mockedUseSolveAd.mockReturnValue({
      solveAd,
      loading: ref(false),
      error: ref(null),
      result: ref(null),
      clearError,
    })
  })

  const mountComponent = () => {
    return mount(AdsComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })
  }

  describe('Advertisement list', () => {
    it('renders available advertisements', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Advertisement Mission')

      expect(wrapper.text()).toContain(
        'Help the village find the lost dragon',
      )

      expect(wrapper.text()).toContain(
        'Deliver supplies to the northern village',
      )
    })

    it('renders the advertisement probability', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Complexity: 80%')
      expect(wrapper.text()).toContain('Complexity: 60%')
    })

    it('renders the number of days remaining', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('3 days left')
      expect(wrapper.text()).toContain('1 days left')
    })

    it('renders the reward points', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('+250')
      expect(wrapper.text()).toContain('+150')
      expect(wrapper.text()).toContain('pts')
    })

    it('renders a Solve Mission button for each advertisement', () => {
      const wrapper = mountComponent()

      const buttons = wrapper
        .findAll('button')
        .filter((button) =>
          button.text().includes('Solve Mission'),
        )

      expect(buttons).toHaveLength(2)
    })
  })

  describe('Empty state', () => {
    it('shows an empty state when there are no advertisements', () => {
      mockedUseAds.mockReturnValue({
        ads: ref<TestAd[]>([]),
        loading: ref(false),
        error: ref(null),
        fetchAds,
      })

      const wrapper = mountComponent()

      expect(wrapper.text()).toContain(
        'No advertisement missions available right now. Check back later!',
      )

      expect(wrapper.text()).not.toContain('Solve Mission')
    })
  })

  describe('Error state', () => {
    it('shows the advertisement error message', () => {
      mockedUseAds.mockReturnValue({
        ads: ref<TestAd[]>([]),
        loading: ref(false),
        error: ref({
          message: 'Failed to load advertisements.',
          status: 500,
        }),
        fetchAds,
      })

      const wrapper = mountComponent()

      expect(wrapper.text()).toContain(
        'Failed to load advertisements.',
      )
    })

    it('shows the default advertisement error message when no message exists', () => {
      mockedUseAds.mockReturnValue({
        ads: ref<TestAd[]>([]),
        loading: ref(false),
        error: ref({
          message: '',
          status: 500,
        }),
        fetchAds,
      })

      const wrapper = mountComponent()

      expect(wrapper.text()).toContain(
        'Failed to load advertisements.',
      )
    })
  })

  describe('Solve Mission', () => {
    it('renders the Solve Mission buttons', () => {
      const wrapper = mountComponent()

      const buttons = wrapper
        .findAll('button')
        .filter((button) =>
          button.text().includes('Solve Mission'),
        )

      expect(buttons).toHaveLength(2)
    })

    it('calls solveAd with the correct advertisement id', async () => {
      const wrapper = mountComponent()

      const button = wrapper
        .findAll('button')
        .find((button) =>
          button.text().includes('Solve Mission'),
        )

      expect(button).toBeDefined()

      await button!.trigger('click')

      expect(solveAd).toHaveBeenCalledTimes(1)

      expect(solveAd).toHaveBeenCalledWith(
        '',
        'ad-123',
      )
    })

    it('calls solveAd with the correct id for multiple advertisements', async () => {
      const wrapper = mountComponent()

      const buttons = wrapper
        .findAll('button')
        .filter((button) =>
          button.text().includes('Solve Mission'),
        )

      expect(buttons).toHaveLength(2)

      await buttons[0]!.trigger('click')
      await buttons[1]!.trigger('click')

      expect(solveAd).toHaveBeenNthCalledWith(
        1,
        '',
        'ad-123',
      )

      expect(solveAd).toHaveBeenNthCalledWith(
        2,
        '',
        'ad-456',
      )
    })
  })

  describe('Expiry styling', () => {
    it('uses warning styling when an advertisement expires in 2 days or less', () => {
      const expiringAd: TestAd = {
        adId: 'ad-expiring',
        message: 'Expiring mission',
        reward: 200,
        expiresIn: 2,
        encrypted: null,
        probability: '70%',
      }

      mockedUseAds.mockReturnValue({
        ads: ref<TestAd[]>([expiringAd]),
        loading: ref(false),
        error: ref(null),
        fetchAds,
      })

      const wrapper = mountComponent()

      const expiryElement = wrapper
        .findAll('span')
        .find((span) =>
          span.text().includes('2 days left'),
        )

      expect(expiryElement).toBeDefined()

      expect(expiryElement!.classes()).toContain(
        'bg-amber-100',
      )

      expect(expiryElement!.classes()).toContain(
        'text-amber-800',
      )
    })

    it('uses normal styling when an advertisement has more than 2 days remaining', () => {
      const normalAd: TestAd = {
        adId: 'ad-normal',
        message: 'Normal mission',
        reward: 200,
        expiresIn: 5,
        encrypted: null,
        probability: '70%',
      }

      mockedUseAds.mockReturnValue({
        ads: ref<TestAd[]>([normalAd]),
        loading: ref(false),
        error: ref(null),
        fetchAds,
      })

      const wrapper = mountComponent()

      const expiryElement = wrapper
        .findAll('span')
        .find((span) =>
          span.text().includes('5 days left'),
        )

      expect(expiryElement).toBeDefined()

      expect(expiryElement!.classes()).toContain(
        'bg-blue-100',
      )

      expect(expiryElement!.classes()).toContain(
        'text-blue-800',
      )
    })
  })
})