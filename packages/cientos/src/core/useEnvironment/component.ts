import { EnvironmentOptions, EnvironmentPresetsType } from './const'
import { CubeTexture, Texture, TextureEncoding } from 'three'
import { defineComponent, PropType } from 'vue'

import { useCientos } from '../useCientos'
import { useEnvironment } from '.'

export const Environment = defineComponent({
  name: 'Environment',
  props: {
    background: {
      type: Boolean,
      default: false,
    },
    blur: {
      type: Number,
      default: 0,
    },
    files: {
      type: [String, Array],
      required: true,
    },
    encoding: Object as PropType<TextureEncoding>,
    path: {
      type: String,
      default: '/',
    },
    preset: Object as PropType<EnvironmentPresetsType>,
  },
  async setup(props, { expose }) {
    let texture: Texture | CubeTexture | null = null

    expose({ getTexture: () => texture })

    texture = await useEnvironment(props as EnvironmentOptions)

    return () => {
      texture
    }
  },
})