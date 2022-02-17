import React from 'react'
import { useTranslation } from 'react-i18next'

//components
import { TagListFrame } from './tag_list_frame'

//images
import CrossSignIcon from '../../../assets/common/cancel_cross_icon.svg'

const Tag = ({
  selected,
  tag_name = '',
  /**
   * action
   */
  clickingTag,
}) => {
  return (
    <div
      className={`mr-2 outline-none rounded-full cursor-pointer px-4 py-1 mb-2 ${
        selected
          ? 'bg-custom-detail text-color-white'
          : 'bg-gray-100 text-color-default'
      }`}
      onClick={clickingTag}
    >
      <p className="tertiary-font">{tag_name}</p>
    </div>
  )
}
const MoreTag = ({
  isMoreTags,
  /**
   * action
   */
  toggleMoreTag,
}) => {
  const { t } = useTranslation()
  return (
    <div
      className="rounded-full px-4 py-1 bg-custom-detail text-color-white mb-2 md:hidden"
      onClick={() => toggleMoreTag()}
    >
      {isMoreTags ? (
        <div className="flex items-center space-x-2 secondary-font">
          <img src={CrossSignIcon} className="w-2.5 h-auto" alt="Close" />
          <p>{t('ProductSearch.close')}</p>
        </div>
      ) : (
        <div className="flex space-x-1 tertiary-font">
          <p>More</p>
          <p>Tags</p>
        </div>
      )}
    </div>
  )
}

export const TagList = ({
  Loading,
  TagListArray = [],
  IsMoreTag,
  SelectedTag,
  /**
   * action
   */
  clickMoreTag,
  clickTag,
}) => {
  const initialTagList = TagListArray.slice(0, 6)

  if (IsMoreTag)
    return (
      <TagListFrame loading={Loading} data={TagListArray}>
        <div className="flex flex-wrap overflow-x-auto md:flex-wrap md:mx-0 mx-2">
          {TagListArray.length > 0 &&
            TagListArray.map((tag, index) => (
              <Tag
                key={index}
                selected={SelectedTag.includes(tag.id)}
                tag_id={tag.id}
                tag_name={tag.name}
                clickingTag={() => clickTag(tag.id)}
              />
            ))}
          <MoreTag toggleMoreTag={clickMoreTag} isMoreTags={IsMoreTag} />
        </div>
      </TagListFrame>
    )

  return (
    <>
      <TagListFrame loading={Loading} data={TagListArray}>
        <div className="flex flex-wrap overflow-x-auto md:flex-wrap md:mx-0 mx-2">
          {TagListArray.length > 0 &&
            initialTagList.map((tag, index) => (
              <Tag
                key={index}
                selected={SelectedTag.includes(tag.id)}
                tag_id={tag.id}
                tag_name={tag.name}
                clickingTag={() => clickTag(tag.id)}
              />
            ))}

          {TagListArray.length > initialTagList.length && (
            <MoreTag toggleMoreTag={clickMoreTag} isMoreTags={IsMoreTag} />
          )}
        </div>
      </TagListFrame>
    </>
  )
}
