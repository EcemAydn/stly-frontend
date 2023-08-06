<script>
definePageMeta({
  defaultScale: "mini",
  scalable: false,
});
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-10 py-4 md:py-8 gap-4 w-full overflow-auto">
    <div class="md:col-span-1">
    </div>
    <CardComponent size="full" class="md:col-span-5 p-8 justify-center">
      <div class="md:col-span-6 mb-4">
        <h2 class="text-xl font-medium">{{ $t('payment.Card Information') }}</h2>
        <p class="mt-1 text-sm text-text-primary-700">{{ $t('payment.cardInformationDescription') }}</p>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-6 mb-8">
        <div class="md:col-span-3">
          <InputComponent
            :label="$t('payment.First Name')"
          />
        </div>

        <div class="md:col-span-3">
          <InputComponent
            :label="$t('payment.Last Name')"
          />
        </div>
        <div class="md:col-span-6">
          <InputComponent
            :label="$t('payment.Credit Card Number')"
            placeholder="1234 1234 1234 1234"
          />
        </div>

        <div class="md:col-span-4">
          <InputComponent
            :label="$t('payment.Expired Date')"
            placeholder="12/34"
          />
        </div>

        <div class="md:col-span-2">
          <InputComponent
            label="CVC"
            placeholder="123"
          />
        </div>
      </div>

      <div class="md:col-span-6 mb-4">
        <h2 class="text-xl font-medium">{{ $t('payment.Billing Adress') }}</h2>
        <p class="mt-1 text-sm text-text-primary-700">{{ $t('payment.billingAddressDescription') }}</p>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-6 mb-4">
        <div class="md:col-span-6">
          <label class="text-text-primary-800 block">{{ $t('payment.Phone Number') }}</label>
          <InputComponent
          />
        </div>
        <div class="md:col-span-6">
          <label for="country" class="block text-text-primary-800 mb-1">{{ $t('payment.Country') }}</label>

        </div>

        <div class="md:col-span-6">
          <InputComponent
            :label="$t('payment.Address')"
            
          />
        </div>

        <div class="md:col-span-3">
          <InputComponent
            :label="$t('payment.City')"
      
          />
        </div>

        <div class="md:col-span-3">
          <InputComponent
            :label="$t('payment.State / Province')"
      
          />
        </div>

        <div class="md:col-span-6">
          <InputComponent
            :label="$t('payment.Postal Code')"
            
          />
        </div>
      </div>
    </CardComponent>

    <div class="md:col-span-3">
      <div class="bg-white">
        <div class="md:col-span-6 p-8">
          <h2 class="text-xl font-medium">{{ $t('payment.Order Summary') }}</h2>
        </div>

        <div class="px-8 pb-8 border-b">
          <div class="flex justify-between items-center mb-4">
            <div>
              <div class="mt-1 text-sm font-medium">
              </div>
            </div>

            <div class="mt-1 text-sm font-medium">
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
          </div>
        </div>

        <div class="p-8 flex flex-col gap-3">
          <ButtonComponent block :text="$t('payment.Subscribe')" />

          <div class="flex flex-col items-center justify-center w-full text-sm font-medium text-indigo-600">
            <span class="text-sm text-black mr-1"> {{ $t('payment.paymentOr') }} </span>
            <div class="cursor-pointer" >{{ $t('payment.Logout') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>