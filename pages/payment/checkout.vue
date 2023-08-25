<script setup>
import { useSubscriptionStore } from '@/stores/payment/payment';
import { useAuthStore } from '@/stores/auth/auth';
import { useAlertStore } from '@/stores/alertStore';
import { vMaska } from "maska"
import VisaIcon from '@/components/icons/VisaIcon.vue'
import MasterCardIcon from '@/components/icons/MasterCardIcon.vue'
import CountryCode from '../../assets/country_codes.json'

definePageMeta({
  middleware: ['authenticated-middleware'],
  defaultScale: 'mini',
  scalable: false,
  extra: true,
});

const subscriptionStore = useSubscriptionStore();
const userStore = useAuthStore();
const alertStore = useAlertStore();

const isLoading = ref(false);
const cardHolderName = ref(null);
const cardNumber = ref(null);
const cardExpiryMonth = ref(null)
const cardExpiryYear = ref(null)
const cardCvc = ref(null);

const district = ref(null);
const city = ref(null);
const country = ref(null);
const zipCode = ref(null);
const address = ref(null);
const phone = ref(null);
const countryCode = ref(null);

const formErrors = ref({
  cardHolderName: '',
  cardNumber: '',
  cardExpiryMonth: '',
  cardExpiryYear: '',
  cardCvc: '',
  district: '',
  city: '',
  country: '',
  zipCode: '',
  address: '',
  phone: '',
  countryCode: '',
});

const formError = ref(null);

async function createSubscription() {
  if (!cardHolderName.value || !cardNumber.value || !cardExpiryMonth.value || !cardExpiryYear.value || !cardCvc.value) {
    return;
  }
  if (!cardHolderName.value) {
    formErrors.value.cardHolderName = 'Card Holder Name is required';
    return;
  }

  if (cardNumber.value.length < 16) {
    formErrors.value.cardNumber = 'Card Number must be 16 digits';
    return;
  }

  if (cardExpiryMonth.value.length !== 2 || parseInt(cardExpiryMonth.value) > 12 || parseInt(cardExpiryMonth.value) < 1) {
  formErrors.value.cardExpiryMonth = 'Card Expiry Month must be 2 digits and between 01 and 12';
  return;
}

  if (cardExpiryYear.value.length !== 4) {
    formErrors.value.cardExpiryYear = 'Card Expiry Year must be 4 digits';
    return;
  }

  if (cardCvc.value.length !== 3) {
    formErrors.value.cardCvc = 'Card Cvc must be 3 digits';
    return;
  }

  if (!district.value || !city.value || !country.value || !zipCode.value || !address.value || !phone.value || !countryCode.value) {
    return;
  }

  if (countryCode.value.length < 2) {
    formErrors.value.countryCode = 'Country Code must be 2 digits';
    return;
  }

  if (phone.value.length < 10) {
    formErrors.value.countryCode = 'Country Code must be 2 digits';
    return;
  }
  isLoading.value = true;
  await subscriptionStore.createSubscription({
    name: userStore.currentUser.first_name,
    surname: userStore.currentUser.last_name,
    pricingPlan: subscriptionStore.selectedPlan.id,
    cardHolderName: cardHolderName.value,
    cardNumber: cardNumber.value.replaceAll(' ', ''),
    expireMonth: cardExpiryMonth.value,
    expireYear: cardExpiryYear.value,
    cvc: cardCvc.value,
    email: userStore.currentUser.email,
    shippingContactName: userStore.currentUser.first_name + ' ' + userStore.currentUser.last_name,
    shippingCity: city.value,
    shippingDistrict: district.value,
    shippingCountry: country.value,
    shippingAddress: address.value,
    shippingZipCode: zipCode.value,
    billingContactName: userStore.currentUser.first_name + ' ' + userStore.currentUser.last_name,
    billingCity: city.value,
    billingDistrict: district.value,
    billingCountry: country.value,
    billingAddress: address.value,
    billingZipCode: zipCode.value,
    gsmNumber: (countryCode.value.replace('+', '') + phone.value).replaceAll(' ', ''),
  })
    .then(async() => {
      await userStore.me();
      alertStore.addAlert({ title: 'Successfully, you has been subscribe', type: 'success' });
    })
    .catch((err) => {
      if (err.errors) {
        const errors = err.errors;

        errors.forEach((error) => {
          formErrors.value[error.path] = error.message
        });
      } else if (err.error) {
        formError.value = err.error;
      } else {
        alertStore.addAlert({ title: err.error, type: 'negative' });
      }
    })
    .finally(() => {
      isLoading.value = false;
    })
}
</script>
<template>
  <div class="grid lg:grid-cols-5 py-4 gap-4 w-full overflow-auto">
    <CardComponent size="full" class="col-span-3 p-8 justify-center">
      <div class="col-span-6 mb-4">
        <h2 class="text-xl font-medium">{{ $t('payment.Card Information') }}</h2>
        <p class="mt-1 text-sm text-text-primary-700">{{ $t('payment.cardInformationDescription') }}</p>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-6 mb-8">
        <div class="col-span-6">
          <InputComponent
              :label="$t('payment.First Name')+ '*'"
              placeholder="John Doe"
              v-model="cardHolderName"
              :error="formErrors.cardHolderName"
              @focus="formErrors.cardHolderName = ''"
            />
        </div>
        <div class="col-span-6"> 
          <div class="flex items-center gap-1 pb-2">
            <label class="text-sm font-medium">{{$t('payment.Credit Card Number')}}*</label>   
            <label class="text-content-secondary dark:text-content-inverted-secondary text-xs">({{ $t('payment.Only for Credit Card') }})</label>      
          </div>
          <InputComponent
              required
              v-maska
              data-maska="#### #### #### ####"
              placeholder="4242 4242 4242 4242"
              v-model="cardNumber"
              minlength="16"
              :error="formErrors.cardNumber"
              @focus="formErrors.cardNumber = ''"
            >
            <template #append>
              <VisaIcon class="w-5 h-5" />
              <MasterCardIcon class="w-5 h-5" />
            </template>
          </InputComponent>
        </div>

        <div class="col-span-6 lg:col-span-2">
          <InputComponent
            required
            v-maska
            data-maska="##"
            :label="$t('payment.Expiry Month')+ '*'"
            placeholder="07"
            v-model="cardExpiryMonth"
            class="w-full"
            :error="formErrors.cardExpiryMonth"
            @focus="formErrors.cardExpiryMonth = ''"
          />
        </div>
        <div class="col-span-6  lg:col-span-2">
          <InputComponent
            :label="$t('payment.Expiry Year')+ '*'"
            v-maska
            data-maska="20##"
            placeholder="2023"
            v-model="cardExpiryYear"
            class="w-full"
            :error="formErrors.cardExpiryYear"
            @focus="formErrors.cardExpiryYear = ''"
          />
        </div>
        <div class="col-span-6 lg:col-span-2">
          <InputComponent
            required
            name="cvc"
            v-maska
            data-maska="###" 
            label="CVC*"
            v-model="cardCvc"
            class="w-full"
            placeholder="CVC"
            :error="formErrors.cardCvc"
            @focus="formErrors.cardCvc = ''"
          />
        </div>
      </div>

      <div class="md:col-span-6 mb-4">
        <h2 class="text-xl font-medium">{{ $t('payment.Billing Adress') }}</h2>
        <p class="mt-1 text-sm text-text-primary-700">{{ $t('payment.billingAddressDescription') }}</p>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-6 mb-4">
        <div class="md:col-span-3">
          <SelectComponent
            :label="$t('payment.Country Code') + '*'"
            :items="CountryCode"
            v-model="countryCode"
            :error="formErrors.countryCode"
            @focus="formErrors.countryCode = ''" 
          >
            <template #selected>
              {{ countryCode ? countryCode : 'Select' }}
            </template>
          </SelectComponent>
        </div>
        <div class="md:col-span-3">
          <InputComponent
            :label="$t('payment.Phone Number') + '*'"
            required
            v-maska
            data-maska="### ### ## ##"
            placeholder="555 555 55 55"
            name="phone"
            type="tel"
            v-model="phone"
            class="w-full"
            :error="formErrors.phone"
            @focus="formErrors.phone = ''"
          />
        </div>

        <div class="md:col-span-3">
          <InputComponent
            :label="$t('payment.Country') + '*'"
            placeholder="Please enter Country"
            v-model="country"
            class="w-full"
            :error="formErrors.country"
            @focus="formErrors.country = ''" 
          />
        </div>

        <div class="md:col-span-3">
          <InputComponent
            :label="$t('payment.City') + '*'"
            placeholder="Please enter City"
            v-model="city"
            class="w-full"
            :error="formErrors.city"
            @focus="formErrors.city = ''" 
          />
        </div>

        <div class="md:col-span-3">
          <InputComponent
            :label="$t('payment.State') + '*'"
            placeholder="Please enter State"
            required
            name="state"
            v-model="district"
            class="w-full"
            :error="formErrors.district"
            @focus="formErrors.district = ''" 
          />
        </div>

        <div class="md:col-span-3">
          <InputComponent
            required
            name="zipcode"
            v-maska
            :label="$t('payment.Postal Code') + '*'"
            v-model="zipCode"
            class="w-full"
            :error="formErrors.zipCode"
            placeholder="Enter your Zip Code"
            @focus="formErrors.zipCode = ''"
          />
        </div>
        <div class="md:col-span-6">
          <InputComponent
            required
            name="address"
            :label="$t('payment.Address') + '*'"
            v-model="address"
            class="w-full"
            :error="formErrors.address"
            placeholder="Enter your Address"
            @focus="formErrors.address = ''"
          />
        </div>
      </div>
    </CardComponent>

    <div v-if="subscriptionStore.selectedPlan" class="col-span-3 lg:col-span-2">
      <CardComponent>
        <div class="md:col-span-6 p-8">
          <h2 class="text-xl font-medium">{{ $t('payment.Order Summary') }}</h2>
        </div>

        <div class="px-8 pb-8 border-b">
          <div class="flex justify-between items-center mb-4">
            <div>
              <div class="mt-1 text-sm font-medium">
                {{ subscriptionStore.selectedPlan.name }}
              </div>
            </div>

            <div class="mt-1 text-sm font-medium">
              ${{ subscriptionStore.selectedPlan.price }}
            </div>
          </div>

          <div class="flex justify-between items-center mb-4">
            <div>
              <div class="mt-1 text-sm font-medium">
                {{ $t('payment.Users') }}
              </div>

              <div class="mt-1 text-sm text-text-primary-600">
                {{ $t('payment.Unlimited') }}
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <div class="mt-1 text-sm font-medium">
                {{ $t('payment.Social Profiles') }}
              </div>

              <div class="mt-1 text-sm text-text-primary-600">
                {{ $t('payment.Unlimited with plan') }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between px-8 py-4 border-b">
          <div>
            {{ $t('payment.Total Amount') }}
          </div>

          <div>
            ${{ subscriptionStore.selectedPlan.price }}
          </div>
        </div>

        <div class="p-8 flex flex-col gap-3">
          <ButtonComponent :loading="isLoading" block :text="$t('payment.Subscribe')" @click="createSubscription" />

          <div class="flex flex-col items-center justify-center w-full text-sm font-medium text-indigo-600">
            <span class="text-sm text-black mr-1"> {{ $t('payment.paymentOr') }} </span>
            <NuxtLink class="cursor-pointer" to="/payment/plans">{{ $t('payment.Continue Billing') }}</NuxtLink>
          </div>
        </div>
      </CardComponent>
    </div>
  </div>
</template>