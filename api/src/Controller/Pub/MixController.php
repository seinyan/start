<?php

namespace App\Controller\Pub;

use App\AppConsts;
use App\Controller\RestController;
use App\Entity\Settings;
use App\Repository\SettingsRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Nelmio\ApiDocBundle\Annotation\Model;
use Swagger\Annotations as SWG;

/**
 * @Route("/mix")
 */
class MixController extends RestController
{
    /**
     * get
     * @Route("/settings", methods="GET")
     * @SWG\Response(
     *     response=200, description=" ",
     *     @SWG\Schema(type="object", ref=@Model(type=Settings::class, groups={"Settings:get", "get", "File:min"}) )
     * )
     * @SWG\Response(response=404, description="Not Found")
     * @SWG\Tag(name="PUB_Mix")
     */
    public function getSettings(Request $request, SettingsRepository $repository)
    {
        $entity = $repository->find(1);
        if(!$entity) {
            $em = $this->em();
            $entity = new Settings();
            $em->persist($entity);
            $em->flush();
        }

        return $this->json_response(
            $entity,
            AppConsts::CODE_200,
            ["Settings:get", "get", "list", "File:min"]
        );
    }



}
