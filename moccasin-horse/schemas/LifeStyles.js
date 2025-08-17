export default {
    name: 'lifestyle',
    title: 'LifeStyle',
    type: 'document',
    fields: [
      
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 200,
          slugify: (input) =>
            input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
        },
        validation: (Rule) => Rule.required(),
      },
      
    
      {
        name: 'image',
        title: 'PostImage',
        type: 'image',
        options: {
          hotspot: true,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [
              { title: 'Normal', value: 'normal' },
              { title: 'H1', value: 'h1' },
              { title: 'H2', value: 'h2' },
              { title: 'H3', value: 'h3' },
              { title: 'H4', value: 'h4' },
              { title: 'Quote', value: 'blockquote' },
              { title: 'Large', value: 'large' }, // Added option for large text
              { title: 'Small', value: 'small' },
            ],
            marks: {
              decorators: [
                { title: 'Strong', value: 'strong' },
                { title: 'Emphasis', value: 'em' },
                { title: 'Underline', value: 'underline' },
                { title: 'Strikethrough', value: 'strikethrough' }, // Added strikethrough mark
              ],
              annotations: [
                // Add custom annotations here if needed
              ],
            },
          },
          {
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'imageBlog',
        title: 'BlogImage',
        type: 'image',
        description: 'Blog image',
      },
      {
        name: 'sortOrder',
        title: 'Sort Order',
        type: 'number',
        validation: (Rule) => Rule.required().integer().min(0),
        description: 'The sorting order of the blog post',
        initialValue: 0,
      },
    ],
    preview: {
      select: {
        title: 'title',
        media: 'image',
      },

    },
  };
  