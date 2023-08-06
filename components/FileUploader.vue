<script setup>
import { ref } from "vue";
import { cva } from "class-variance-authority";
const file = cva(
  [
    "text-content-primary flex gap-1 justify-between items-start bg-interaction-neutral-subtle-normal w-full rounded-md p-4",
  ],
  {
    variants: {
      inverted: {
        true: [],
        false: [],
      },
      extended: {
        true: [],
        false: [],
      },
      thumbnail: {
        true: [],
        false: [],
      },
    },
    compoundVariants: [
      {
        inverted: false,
        extended: false,
        thumbnail: false,
        class: "bg-interaction-neutral-subtle-normal",
      },
      {
        inverted: true,
        extended: false,
        thumbnail: false,
        class:
          "bg-interaction-background-form-field border border-interaction-border-neutral-normal",
      },
      {
        inverted: false,
        extended: true,
        thumbnail: false,
        class: "bg-interaction-neutral-subtle-normal",
      },
      {
        inverted: false,
        extended: true,
        thumbnail: true,
        class: "bg-interaction-neutral-subtle-normal",
      },
      {
        inverted: true,
        extended: true,
        thumbnail: true,
        class:
          "bg-interaction-background-form-field border-interaction-border-neutral-normal",
      },
    ],
  }
);

const inputFile = ref(null);
const filesInfo = ref([]);
const isFileSelected = ref(false);

const props = defineProps({
  label: {
    type: String,
    default: "Label",
  },
  helper: {
    type: String,
    default: "helper",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  inverted: {
    type: Boolean,
    default: false,
  },
  extended: {
    type: Boolean,
    default: false,
  },
  thumbnail: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
function handleInputClick() {
  inputFile.value.click();
}

function onFileDropped(event) {
  event.preventDefault();
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    inputFile.value = files[0];
    fileUpload(event.dataTransfer.files);
  }
}

function onFileSelected(event) {
  fileUpload(event.target.files);
}

function fileUpload(files) {
  if (props.multiple) {
    for (let i = 0; i < files.length; i++) {
      filesInfo.value.push(createFileInfo(files[i]));
    }
  } else {
    filesInfo.value = [createFileInfo(files[0])];
  }
  emit("update:modelValue", filesInfo);
  isFileSelected.value = true;
}

function createFileInfo(file) {
  // Dosya boyutu
  const fileSize = (file.size / (1024 * 1024)).toFixed(1) + "MB";
  // Dosya adı
  const fileName = file.name;
  // Dosya uzantisi
  const fileExtension = file.type.split("/")[1];

  // Eğer dosya bir resim ise, URL'yi oluştur
  let fileUrl = null;
  if (
    fileExtension === "jpeg" ||
    fileExtension === "png" ||
    fileExtension === "webp" ||
    fileExtension === "gif"
  ) {
    fileUrl = URL.createObjectURL(file);
  }
  return {
    file,
    fileSize,
    fileName,
    fileExtension,
    fileUrl,
  };
}
function removeFile(index) {
  filesInfo.value.splice(index, 1);
  if (filesInfo.value.length === 0) {
    isFileSelected.value = false;
  }
}
</script>
<template>
  <div class="flex flex-col gap-2 text-sm text-content-primary w-full">
    <p class="font-medium">{{ label }}</p>
    <div
      v-show="multiple || !isFileSelected"
      class="relative cursor-pointer p-6 border-2 border-dashed w-full text-sm text-content-primary border-interaction-border-neutral-normal bg-interaction-background-form-field rounded-md flex flex-col items-center gap-4"
      @drop="onFileDropped"
      @dragover.prevent
      @click="handleInputClick"
    >
      <IconBase>
        <UploadIcon />
      </IconBase>
      <div class="flex flex-col gap-2 items-center">
        <div>
          Drag & Drop or
          <button
            type="button"
            class="cursor-pointer text-action-primary-normal"
          >
            Choose file
          </button>
          to upload
        </div>
        <div class="text-xs text-content-secondary">
          JPG, GIF or PNG. Max size of 800K
        </div>
        <input
          ref="inputFile"
          type="file"
          @input="(e) => $emit('update:modelValue', e.target.value)"
          :value="modelValue"
          class="hidden"
          :multiple="multiple"
          @change="onFileSelected"
        />
      </div>
    </div>
    <p v-if="multiple">{{ helper }}</p>
    <!-- :class="multiple ? 'px-4 py-2' : 'p-4'" -->
    <div class="max-h-36 overflow-auto flex flex-col gap-2">
      <div
        v-for="(fileInfo, index) in filesInfo"
        :key="index * 3123129"
        v-show="isFileSelected"
        :class="file({ inverted, extended, thumbnail })"
      >
        <div class="flex items-center gap-4 w-full truncate">
          <div v-if="!multiple && !thumbnail">
            <img
              v-if="fileInfo.fileUrl"
              :src="fileInfo.fileUrl"
              class="w-8 h-10"
            />

            <IconBase v-else width="32" height="40" viewBox="0 0 32 40">
              <PdfIcon v-if="fileInfo.fileExtension === 'pdf'" />
              <ZipIcon v-else-if="fileInfo.fileExtension === 'zip'" />
              <ExcelIcon
                v-else-if="
                  fileInfo.fileExtension === 'xlsx' ||
                  fileInfo.fileExtension === 'xlsm'
                "
              />
              <WordIcon
                v-else-if="
                  fileInfo.fileExtension === 'docm' ||
                  fileInfo.fileExtension === 'docx'
                "
              />
              <DocumentIcon v-else />
            </IconBase>
          </div>
          <div
            class="truncate"
            :class="multiple ? 'flex items-center gap-2' : ''"
          >
            <div class="leading-6 truncate text-ellipsis">
              {{ fileInfo.fileName }}
            </div>
            <div class="text-content-secondary text-xs">
              {{ fileInfo.fileSize }}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button
            type="button"
            v-if="!multiple"
            @click="handleInputClick"
            class="text-action-primary-normal"
          >
            Replace
          </button>
          <button type="button" @click="removeFile(index)">
            <IconBase>
              <CloseIcon />
            </IconBase>
          </button>
        </div>
      </div>
    </div>
    <p v-if="!multiple">{{ helper }}</p>
  </div>
</template>
