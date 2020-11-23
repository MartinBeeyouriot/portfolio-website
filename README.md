# Portfolio Website

Website in typescript and vaadin to list all your projects in a nice way with details, tags, dates, carousel.
You can easily customize the projects to add your own.

## Creating Projects

Place a projects.ts file inside the foler `frontend/views/portfolio` and declare and export an array called project.

```typescript
export const projects = [
  {
    img: 'icons/your_icon.png',
    title: 'Job Title',
    date: 'Dates',
    goal: `Summary HTML is supported in here.`,
    description: `Description, HTML is supported too.`,
    url: 'project_url',
    images: ['list_of_images.jpg'],
    fragment: 'fragment-url',
    tags: ['#list your tag'],
  };
```

Place image and icons into `src/resources/META-INF/resources/your_loder`




## Run
To run from the command line, use `mvn` and open [http://localhost:8080](http://localhost:8080) in your browser.

## Deploy 

`mvn package` 